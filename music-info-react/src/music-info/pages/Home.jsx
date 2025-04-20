// Home/start page
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import icons from react-bootstrap-icons
import { BoomboxFill, VinylFill, PersonFill } from "react-bootstrap-icons";

// Import the service class
import musicService from "../../services/musicGroupServices";

export default function Home() {
    const [dbInfo, setDbInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //Initialize the service
            const _service = new musicService(
                `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
            );
            //Read Database info async
            const data = await _service.readInfoAsync();
            setDbInfo(data.db);
        };
        // Call the fetch function
        fetchData();
    }, []);

    // Page title
    useEffect(() => {
        document.title = "Music info";
    }, []);

    return (
        <>
            {/* Main content of the page */}
            <Container className="py-4" id="home">
                <main>
                    <div className="bg-body-tertiary p-5 rounded">
                        {/* Display Database info */}
                        <Container id="webapi-info">
                            <h2 className="pb-2 border-bottom">
                                Music info with React made by
                            </h2>
                            <p>
                                Below you see an overview of content in the
                                music-database
                            </p>

                            <Row
                                xs={1}
                                sm={2}
                                md={3}
                                lg={5}
                                className="g-4 py-5"
                            >
                                <Col className="d-flex align-items-start">
                                    <BoomboxFill
                                        size={28}
                                        className="text-body-secondary flex-shrink-0 me-3"
                                    />
                                    <div>
                                        <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                                            Music groups
                                        </h3>
                                        <p>
                                            {dbInfo
                                                ? `${dbInfo.nrSeededMusicGroups} music groups`
                                                : "Loading..."}
                                        </p>
                                    </div>
                                </Col>

                                <Col className="d-flex align-items-start">
                                    <VinylFill
                                        size={28}
                                        className="text-body-secondary flex-shrink-0 me-3"
                                    />
                                    <div>
                                        <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                                            Albums
                                        </h3>
                                        <p>
                                            {dbInfo
                                                ? `${dbInfo.nrSeededAlbums} albums`
                                                : "Loading..."}
                                        </p>
                                    </div>
                                </Col>

                                <Col className="d-flex align-items-start">
                                    <PersonFill
                                        size={28}
                                        className="text-body-secondary flex-shrink-0 me-3"
                                    />
                                    <div>
                                        <h3 className="fw-bold mb-0 fs-4 text-body-emphasis">
                                            Artists
                                        </h3>
                                        <p>
                                            {dbInfo
                                                ? `${dbInfo.nrSeededArtists} artists`
                                                : "Loading..."}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </main>
            </Container>
        </>
    );
}
