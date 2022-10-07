import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "Pierwsze spotkanko",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/7/7a/Rynek_Ko%C5%9Bciuszki%2C_Bia%C5%82ystok_%282%29.jpg",
//     addres: "Rynek w Biamstoku",
//     description: "Spotkanko na mieście",
//   },
//   {
//     id: "m2",
//     title: "Mońki day",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tuor_de_Pologne_2008_-_Mo%C5%84ki.JPG/1024px-Tuor_de_Pologne_2008_-_Mo%C5%84ki.JPG",
//     addres: "Gdzieś w Mońkach",
//     description: "Spotkanko z polonio amerykańsko",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Mitaps</title>
        <meta
          name="description"
          content="Huuuuge list of meetups wrote in React+Next.js"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://testowy:testowy@cluster0.i09vzub.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
