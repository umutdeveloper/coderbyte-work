
# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

  

- Data is saved in the database in the Facilities, Agents, and Shifts tables

- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each

- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

  

## You've been asked to work on a ticket. It reads:

  

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

  
  

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

  
  

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

  

## Your Breakdown Here

  

### Ticket 1: Add `custom_id` field to the AgentFacilityRelation table

**Description:**

In order to store custom ids for each Agent-Facility relation, we need to add a new field `custom_id` to the `AgentFacilityRelation` table in the database.

**Acceptance Criteria:**

-   `custom_id` field is added to the `AgentFacilityRelation` table.
-   Migration script is created for the schema change.

**Time/effort estimate:** 2 hours

**Implementation Details:**

-   Update the Prisma schema for the `AgentFacilityRelation` table by adding the `custom_id` field.
-   Generate a migration script using Prisma.io for schema versioning and migrations.
-   Apply the migration script to update the database schema.

### Ticket 2: Update API for saving custom ids

**Description:**

Update the API for Facilities to save custom ids for each Agent they work with.

**Acceptance Criteria:**

-   API allows Facilities to add or update custom ids for each Agent.
-   Custom id is saved in the AgentFacilityRelation table.

**Time/effort estimate:** 4 hours

**Implementation Details:**

-   Update the Express.js API routes to add a new endpoint for adding or updating custom ids. (Or update the existing agent relation endpoints for handling custom id)
-   Implement the controller function to save the custom id in the `AgentFacilityRelation` table.
-   Validate the custom id for uniqueness within the context of the Facility.
-   Add appropriate error handling for invalid input and database errors.

### Ticket 3: Modify the `getShiftsByFacility` and `generateReport` function 

**Description:**

Modify the `getShiftsByFacility` function to include the custom id of the Agent in the returned metadata. And update the `generateReport` function to use the custom ids of Agents when generating reports for Facilities.

**Acceptance Criteria:**

-   `getShiftsByFacility` function includes custom ids in the returned metadata.
-   Reports display the custom id of the Agent instead of the internal database id.

**Time/effort estimate:** 6 hours

**Implementation Details:**

-   Update the `getShiftsByFacility` function to join the `AgentFacilityRelation` table and retrieve the custom id.
-   Include the custom id in the metadata of each Shift object returned by the function.
-   Modify the `generateReport` function to use the custom id from the Shift metadata instead of the internal database id.
-   Update the PDF generation code to display the custom id in the reports.

### Ticket 4: Implement frontend changes for adding/updating custom ids for agents

**Description:**

Implement frontend changes to allow Facilities to add or update custom ids for Agents.

**Acceptance Criteria:**

-   Facilities can add or update custom ids for Agents via the frontend.

**Time/effort estimate:** 6 hours

**Implementation Details:**

-   Update the Next.js frontend to include a new form or modal for adding or updating custom ids for Agents. (Or update the existing agent creation/update forms to be able to get custom id also)
-   Use Tailwind UI and Tailwind CSS to style the form or modal.
-   Implement frontend logic to call the API for adding or updating custom ids. (Or update the existing API call for sending custom id)
-   Show the validation results if custom id is already exist or not valid.
-   Add or update the test cases for new custom id ability.

### Ticket 5: Implement frontend changes for generating reports

**Description:**

Implement frontend changes to allow Facilities to generate reports by using custom ids for Agents.

**Acceptance Criteria:**

-   Facilities can generate reports by using custom ids for Agents via the frontend.

**Time/effort estimate:** 6 hours

**Implementation Details:**

-   Update the Next.js frontend to have ability to set custom id to generate reports for agents
-   Use Tailwind UI and Tailwind CSS to style the input.
-   Update frontend logic to call the API with custom id to trigger generating reports.
-   Show the validation results if custom id is not found (or directly use a select component with autocomplete and searching feature to get rid of not found errors)
-   Update the test cases for new custom id generation ability.

