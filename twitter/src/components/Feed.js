import React from "react";
import { Container, Row, Col } from "react-materialize";
import Profile from "./Profile";
import AddPost from "./AddPost";
import PostList from "./PostList";

export default ({ userDetails }) => {
  return (
    <Container>
      <Row>
        <Col s={12} m={4}>
          <Profile userDetails={userDetails} />
        </Col>
        <Col s={12} m={8}>
          <AddPost />
          <PostList />
        </Col>
      </Row>
    </Container>
  );
};