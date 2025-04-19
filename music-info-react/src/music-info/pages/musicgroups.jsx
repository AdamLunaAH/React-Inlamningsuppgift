import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
// Import the service class
import musicService from "../../services/musicGroupServices";
export default function MusicGroups() {
    //Initialize the service, uses memo to avoid re-initializing the service on every render
    const _service = React.useMemo(
        () =>
            new musicService(
                `https://seido-webservice-307d89e1f16a.azurewebsites.net/api`
            ),
        []
    );
    const [searchParams, setSearchParams] = useSearchParams();

    // Read values from the URL
    const initialSearch = searchParams.get("search") || "";
    const initialPage = parseInt(searchParams.get("page") || "0", 10);

    const [musicGroups, setMusicGroups] = useState([]);
    const [searchInput, setSearchInput] = useState(initialSearch);

    // Only used when search is triggered (used to stop the switch page buttons to use the search value)
    const [activeSearch, setActiveSearch] = useState(initialSearch);
    const [currentPageNr, setCurrentPageNr] = useState(initialPage);
    const [pageCount, setPageCount] = useState(1);
    const [dbItemsCount, setDbItemsCount] = useState(0);

    // Checks if the search input is null or whitespace and returns true or false
    const isNullOrWhiteSpace = (str) => str == null || str.trim().length === 0;

    // Gets the music groups data from the service, uses useCallback to avoid re-initializing the function on every render
    const fetchData = React.useCallback(
        async (page, search) => {
            const result = isNullOrWhiteSpace(search)
                ? await _service.readMusicGroupsAsync(page, true)
                : await _service.readMusicGroupsAsync(page, true, search);

            setMusicGroups(result.pageItems);
            setPageCount(result.pageCount);
            setDbItemsCount(result.dbItemsCount);
        },
        [_service]
    );

    // Fetch data when page number or search term changes
    useEffect(() => {
        fetchData(currentPageNr, activeSearch);
    }, [currentPageNr, activeSearch, fetchData]);

    // Handles the search
    const handleSearch = () => {
        // Apply search filter
        setActiveSearch(searchInput);
        // Switch to the first page
        setCurrentPageNr(0);
        setSearchParams({ search: searchInput, page: "0" });
    };

    // Handles the clear search
    const handleClear = () => {
        setSearchInput("");
        setActiveSearch("");
        setCurrentPageNr(0);
        // Clear URL params
        setSearchParams({});
    };

    // Handles the previous page function
    const handlePrev = () => {
        if (currentPageNr > 0) {
            const newPage = currentPageNr - 1;
            setCurrentPageNr(newPage);
            setSearchParams({ search: activeSearch, page: newPage.toString() });
        }
    };

    // Handles the next page function
    const handleNext = () => {
        if (currentPageNr < pageCount - 1) {
            const newPage = currentPageNr + 1;
            setCurrentPageNr(newPage);
            setSearchParams({ search: activeSearch, page: newPage.toString() });
        }
    };

    return (
        <main>
            <Container className="container-sm">
                <h1 className="pb-2 border-bottom">List of music groups</h1>
                {/* Search form with clear search */}
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
                                        <Link
                                            to={`/groupinfo/${item.musicGroupId}`}
                                            className="btn btn-primary btn-sm btn-block"
                                            role="button"
                                            aria-pressed="true"
                                        >
                                            Go to group info
                                        </Link>
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
