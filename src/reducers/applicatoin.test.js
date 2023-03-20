import React from "react";
import { render, cleanup } from "@testing-library/react"
import reducer, { SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW } from "./application";
import Application from "components/Application";

afterEach(cleanup);

describe("Application Reducer", () => {
  it("throws an error with an unsupported type", () => {
    //const check = reducer({}, { type: null });

    expect(() => reducer({}, { type: null })).toThrowError(/Tried to reduce with unsupported action type/i);

  });
})