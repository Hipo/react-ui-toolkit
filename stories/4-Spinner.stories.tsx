import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Spinner from "../src/spinner/Spinner";

storiesOf("Spinner", module).add("Spinner", () => (
  <Fragment>
    <Spinner />

    <style>
      {`
        .spinner {
          width: 50px;
          height: 50px;
        }
      `}
    </style>
  </Fragment>
));
