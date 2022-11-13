import React from 'react'
import { useQuery, gql } from '@apollo/client';
import {
  Button,
  CardText,
  Card,
  Spinner,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from 'reactstrap'

const QUERY = gql`
  query {
    adminListUser {
      data {
        id
        fullname
        username
        email
        phoneNumber
        profilePicture
        roleName
      }
    }
  }
`

export default function Home() {
  const { data, loading } = useQuery(QUERY)

  if (loading || !data) return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Spinner>Loading...</Spinner>
    </div>
  );

  return (
    <React.Fragment>
      {data.adminListUser.data.map((x: any, key: number) => {
        return (
          <Row>
            <Col lg={6}>
              <Card
                style={{
                  width: '18rem'
                }}
                key={key}
              >
                <img
                  alt="Sample"
                  src={x?.profilePicture} />
                <CardBody>
                  <CardTitle tag="h5">
                    {x?.fullname}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    Card subtitle
                  </CardSubtitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                  </CardText>
                  <Button>
                    Button
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )
      })}
    </React.Fragment>
  )
}
