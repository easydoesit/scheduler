import React from "react";
import { render, cleanup, prettyDOM, waitForElement, getByText, fireEvent, getByAltText, getAllByTestId, getByLabelText, getByPlaceholderText, getByDisplayValue, getByTitle, getByRole, getByTestId, queryByText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const days = getAllByTestId(container, "day");

    const day = days.find(day => queryByText(day, "Monday"));

    expect(queryByText(day, /no spots remaining/i)).toBeInTheDocument();

  });

  it("loads data, cancels an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked Appointment.

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the element with the text "confirm" is displayed.
    expect(getByText(appointment, /Confirm/i));
    // 5. Click the Confirm Button
    fireEvent.click(getByText(appointment, /Confirm/i));
    // 6. CHeck that the element with the text "Deleting" is Displayed
    expect(getByText(appointment, "DELETE")).toBeInTheDocument();

    // 7. Wait until the element with Alt Text "Add" is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const days = getAllByTestId(container, "day");

    const day = days.find(day => queryByText(day, "Monday"));
    expect(queryByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    //3. Click the Edit Button to Edit Appointment
    fireEvent.click(getByAltText(appointment, "Edit"));

    //4. Change The Name of the Student
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //6. Click the Save Button
    fireEvent.click(getByText(appointment, "Save"));
    //7. Confirm the Save Card is Displayed
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    //8. Wait for the New Student Name to Be Displayed in the Appointment
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    //9. Confirm 1 Spot Remaining in the Days List.
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));

    expect(queryByText(day, /1 spot remaining/i)).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //render the application
    const { container } = render(<Application />);
    //wait for appointment with student in it
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    //get the appointement component
    const appointment = appointments[0];

    // click add
    fireEvent.click(getByAltText(appointment, "Add"));
    // change the student name
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // pick an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // click save
    fireEvent.click(getByText(appointment, "Save"));
    // check that Saving Feedback is rendered
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    // wait for the error
    await waitForElement(() => getByText(appointment, "Error"));
    // click close
    fireEvent.click(getByAltText(appointment, "Close"));
    // verify that we are back at the form.
    expect(getByText(appointment, "Save")).toBeInTheDocument;
  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // render the application
    const { container } = render(<Application />);
    // wait for the appointment to render
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    // get the appointment
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
    // click delete
    fireEvent.click(getByAltText(appointment, "Delete"));
    // verify the confirm element is displayed
    expect(getByText(appointment, /Confirm/i));
    // click confirm
    fireEvent.click(getByText(appointment, /Confirm/i));
    // verify that the delete card is displayed
    expect(getByText(appointment, "DELETE")).toBeInTheDocument();
    // wait for the error warning
    await waitForElement(() => getByText(appointment, "Error"));
    // close the error
    fireEvent.click(getByAltText(appointment, "Close"));
    // verify that we are back where we started
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument;
  });

})