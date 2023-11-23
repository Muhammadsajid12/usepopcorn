import React from "react";
import { useParams } from "react-router-dom";

// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

function Actor() {
  // Create styles

  const { userId } = useParams();

  return (
    <>
      <div> This is Actor detail of {userId} </div>
      {/* <Row>
        <Col xs="12" className="text-center">
          <Card>
            <CardBody className="text-center">
              <h1> This is paragraph</h1>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}

export default Actor;
