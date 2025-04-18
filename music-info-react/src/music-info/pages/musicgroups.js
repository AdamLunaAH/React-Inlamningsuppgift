import React, { useState, useEffect } from "react";
import musicService from "../../services/music-group-services";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function MusicGroups() {
    const _service = new musicService(
        `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
    );

    const [musicGroups, setMusicGroups] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPageNr, setCurrentPageNr] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [dbItemsCount, setDbItemsCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPageNr, searchInput]);

    const isNullOrWhiteSpace = (str) => str == null || str.trim().length === 0;

    const fetchData = async () => {
        let result;
        if (isNullOrWhiteSpace(searchInput)) {
            result = await _service.readMusicGroupsAsync(currentPageNr, true);
        } else {
            result = await _service.readMusicGroupsAsync(
                currentPageNr,
                true,
                searchInput
            );
        }

        setMusicGroups(result.pageItems);
        setPageCount(result.pageCount);
        setDbItemsCount(result.dbItemsCount);
    };

    const handleSearch = () => {
        setCurrentPageNr(0);
        fetchData();
    };

    const handleClear = () => {
        setSearchInput("");
        setCurrentPageNr(0);
    };

    const handlePrev = () => {
        if (currentPageNr > 0) {
            setCurrentPageNr(currentPageNr - 1);
        }
    };

    const handleNext = () => {
        if (currentPageNr < pageCount - 1) {
            setCurrentPageNr(currentPageNr + 1);
        }
    };

    return (
        <main>
            <Container className="container-sm">
                <h1 className="pb-2 border-bottom">List of music groups</h1>

                <Form className="mb-3">
                    <Form.Label htmlFor="search-input">
                        Search for music groups
                    </Form.Label>
                    <Form.Control
                        type="text"
                        id="search-input"
                        placeholder="Search for music groups..."
                        className="mb-3"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <Button
                        variant="primary"
                        onClick={handleSearch}
                        className="me-2"
                    >
                        Search
                    </Button>
                    <Button variant="primary" onClick={handleClear}>
                        Clear search
                    </Button>
                </Form>

                <section className="container-sm d-flex flex-column align-items-center">
                    <h2 id="music-group-count">
                        {dbItemsCount} music groups found
                    </h2>

                    <Row className="w-100">
                        <Col className="d-flex justify-content-evenly toc border-bottom">
                            <p>Music group name</p>
                            <p>Year established</p>
                            <p>Group info</p>
                        </Col>
                    </Row>

                    <div className="w-100">
                        {musicGroups.map((item, index) => {
                            const themeClass =
                                (index + 1) % 2 === 0
                                    ? "theme-even"
                                    : "theme-odd";
                            return (
                                <Row
                                    key={item.musicGroupId}
                                    className={`col-md-12 ${themeClass} d-flex justify-content-evenly`}
                                >
                                    <Col className="music-group-name">
                                        {item.name}
                                    </Col>
                                    <Col className="music-group-year">
                                        {item.establishedYear}
                                    </Col>
                                    <Col>
                                        <a
                                            href={`groupinfo.html?id=${item.musicGroupId}`}
                                            className="btn btn-primary btn-sm btn-block"
                                            role="button"
                                            aria-pressed="true"
                                        >
                                            Go to group info
                                        </a>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <Button
                            variant="primary"
                            onClick={handlePrev}
                            disabled={currentPageNr === 0}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={currentPageNr >= pageCount - 1}
                        >
                            Next
                        </Button>
                    </div>
                </section>
            </Container>
        </main>
    );
}
