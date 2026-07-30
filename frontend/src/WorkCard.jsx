function displayValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return value;
}

function WorkCard(props) {
  const workItem = props.workItem;

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition hover:border-neutral-700">
      <div className="flex flex-col gap-4 border-b border-neutral-800 px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
            Test name
          </p>

          <h4 className="mt-1 break-words text-lg font-semibold text-white">
            {displayValue(workItem.testName)}
          </h4>
        </div>

        <div className="shrink-0">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-neutral-500 sm:text-right">
            Status
          </p>

          <span className="inline-flex max-w-full rounded-full border border-blue-900 bg-blue-950/60 px-3 py-1 text-sm font-medium text-blue-300">
            <span className="break-words">
              {displayValue(workItem.status)}
            </span>
          </span>
        </div>
      </div>

      <div className="px-5 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Sample name
          </p>

          <p className="mt-1 break-words text-base font-medium text-neutral-100">
            {displayValue(workItem.sampleName)}
          </p>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-black px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Analyst due date
            </dt>

            <dd className="mt-1 break-words text-sm font-medium text-neutral-200">
              {displayValue(workItem.analystDueDate)}
            </dd>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-black px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              TAT
            </dt>

            <dd className="mt-1">
              <span className="inline-flex max-w-full rounded-full border border-amber-900 bg-amber-950/50 px-2.5 py-1 text-xs font-medium text-amber-300">
                <span className="break-words">
                  {displayValue(workItem.tat)}
                </span>
              </span>
            </dd>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-black px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Queue status
            </dt>

            <dd className="mt-1">
              <span className="inline-flex max-w-full rounded-full border border-violet-900 bg-violet-950/50 px-2.5 py-1 text-xs font-medium text-violet-300">
                <span className="break-words">
                  {displayValue(workItem.queueStatus)}
                </span>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default WorkCard;