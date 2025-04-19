import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import musicService from "../../services/musicGroupServices";

export default function GroupInfo() {
    // Get group ID from URL parameters
    const { id } = useParams();
    const [groupData, setGroupData] = useState(null);
    //Initialize the service, uses memo to avoid re-initializing the service on every render
    const _service = React.useMemo(
        () =>
            new musicService(
                `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
            ),
        []
    );

    // Fetch group data when the component mounts or when the ID changes
    useEffect(() => {
        const fetchData = async () => {
            const data = await _service.readMusicGroupAsync(id, false);
            setGroupData(data);
        };
        fetchData();
    }, [id, _service]);

    if (!groupData) return <p>Loading...</p>;

    return (
        <main>
            <Container className="d-flex align-items-center flex-column">
                <Row
                    className="mb-2 col-md-12 d-flex justify-content-evenly"
                    id="group-info"
                >
                    <Col sm={12}>
                        <h1 className="display-5 fw-medium mb-3 text-center">
                            {groupData.name}
                        </h1>
                        <p className="fs-4 mb-3 text-center">
                            Established: {groupData.establishedYear}
                        </p>
                        <p className="fs-4 mb-3 text-center">
                            Genre: {groupData.strGenre}
                        </p>
                    </Col>
                    <GroupMembers artists={groupData.artists} />
                    <GroupAlbums albums={groupData.albums} />
                </Row>
            </Container>
        </main>
    );
}

// Display group members
function GroupMembers({ artists }) {
    return (
        <Col sm={6} className="mb-3">
            <h2 className="display-6 fw-light text-center">Members</h2>
            <div>
                {artists.map((artist, idx) => (
                    <p
                        key={idx}
                        className={idx % 2 === 0 ? "theme-even" : "theme-odd"}
                    >
                        {artist.firstName} {artist.lastName}
                    </p>
                ))}
            </div>
        </Col>
    );
}

// Display group albums
function GroupAlbums({ albums }) {
    return (
        <Col sm={6} className="mb-3">
            <h2 className="display-6 fw-light text-center">Albums</h2>
            <div>
                {albums.map((album, idx) => (
                    <p
                        key={idx}
                        className={idx % 2 === 0 ? "theme-even" : "theme-odd"}
                    >
                        {album.name}
                    </p>
                ))}
            </div>
        </Col>
    );
}
