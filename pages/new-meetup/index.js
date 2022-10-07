import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetuHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Just do it by yourself, add meetups"
        ></meta>
      </Head>

      <NewMeetupForm onAddMeetup={addMeetuHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
