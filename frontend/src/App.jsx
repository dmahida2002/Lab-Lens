import { useEffect, useState } from "react";

import { getApprovedUsers, getWorkForUser } from "./api";
import WorkCard from "./WorkCard";

function App() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const [workItems, setWorkItems] = useState([]);
  const [workErrorMessage, setWorkErrorMessage] = useState("");
  const [isLoadingWork, setIsLoadingWork] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const approvedUsers = await getApprovedUsers();
        setUsers(approvedUsers);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === "") {
      return;
    }

    async function loadWork() {
      try {
        const assignedWork = await getWorkForUser(selectedUserId);
        setWorkItems(assignedWork);
      } catch (error) {
        setWorkErrorMessage(error.message);
      } finally {
        setIsLoadingWork(false);
      }
    }

    loadWork();
  }, [selectedUserId]);

  function handleUserChange(event) {
    const newUserId = event.target.value;

    setSelectedUserId(newUserId);
    setWorkItems([]);
    setWorkErrorMessage("");
    setIsLoadingWork(newUserId !== "");
  }

  let selectedUserName = "";

  for (let index = 0; index < users.length; index++) {
    const user = users[index];

    if (String(user.id) === selectedUserId) {
      selectedUserName = user.displayName;
      break;
    }
  }

  let analystPlaceholder = "Select an analyst";

  if (isLoadingUsers) {
    analystPlaceholder = "Loading analysts...";
  } else if (errorMessage !== "") {
    analystPlaceholder = "Unable to load analysts";
  } else if (users.length === 0) {
    analystPlaceholder = "No analysts available";
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <header className="border-b border-neutral-800 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-semibold text-white shadow-lg shadow-blue-950/40">
              L
            </div>

            <div>
              <h1 className="text-lg font-semibold text-white">
                Lab Lens
              </h1>

              <p className="text-sm text-neutral-400">
                Laboratory workflow viewer
              </p>
            </div>
          </div>

          <span className="hidden rounded-full border border-blue-900 bg-blue-950/60 px-3 py-1 text-sm font-medium text-blue-300 sm:inline-flex">
            Portfolio Demo
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <p className="text-sm font-medium text-blue-400">
            Laboratory operations
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Assigned Laboratory Work
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
            Select an analyst to view assignments from the configured
            monday.com demo board.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
          <div>
            <h3 className="text-base font-semibold text-white">
              Choose an analyst
            </h3>

            <p className="mt-1 text-sm text-neutral-400">
              The list includes active members configured for this portfolio
              demonstration.
            </p>
          </div>

          {errorMessage !== "" && (
            <div
              className="mt-5 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-300"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <div className="mt-5">
            <label
              className="block text-sm font-medium text-neutral-300"
              htmlFor="analyst-select"
            >
              Analyst
            </label>

            <select
              className="mt-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-950 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-600 sm:max-w-md"
              id="analyst-select"
              value={selectedUserId}
              onChange={handleUserChange}
              disabled={
                isLoadingUsers ||
                errorMessage !== "" ||
                users.length === 0
              }
            >
              <option value="">{analystPlaceholder}</option>

              {users.map(function (user) {
                return (
                  <option key={user.id} value={user.id}>
                    {user.displayName}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        {selectedUserId !== "" && (
          <section className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Assigned work
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  Assignments for{" "}
                  <span className="font-medium text-neutral-200">
                    {selectedUserName}
                  </span>{" "}
                  from the configured demo board.
                </p>
              </div>

              {!isLoadingWork &&
                workErrorMessage === "" &&
                workItems.length > 0 && (
                  <span className="rounded-full border border-blue-900 bg-blue-950/60 px-3 py-1 text-sm font-medium text-blue-300">
                    {workItems.length}{" "}
                    {workItems.length === 1 ? "item" : "items"}
                  </span>
                )}
            </div>

            <div
              aria-live="polite"
              aria-busy={isLoadingWork}
            >
              {isLoadingWork && (
                <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950 px-5 py-8 text-center">
                  <div
                    className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-blue-500"
                    aria-hidden="true"
                  />

                  <p className="mt-4 text-sm font-medium text-neutral-200">
                    Loading assigned work...
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Retrieving assignments from the configured monday.com demo
                    board.
                  </p>
                </div>
              )}

              {workErrorMessage !== "" && (
                <div
                  className="mt-5 rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-sm text-red-300"
                  role="alert"
                >
                  {workErrorMessage}
                </div>
              )}

              {!isLoadingWork &&
                workErrorMessage === "" &&
                workItems.length === 0 && (
                  <div className="mt-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 px-5 py-10 text-center">
                    <p className="font-medium text-neutral-100">
                      No assigned work found
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      This analyst currently has no matching demo assignments.
                    </p>
                  </div>
                )}

              {!isLoadingWork &&
                workErrorMessage === "" &&
                workItems.length > 0 && (
                  <div className="mt-5 grid gap-4">
                    {workItems.map(function (workItem, index) {
                      return (
                        <WorkCard
                          key={index}
                          workItem={workItem}
                        />
                      );
                    })}
                  </div>
                )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
