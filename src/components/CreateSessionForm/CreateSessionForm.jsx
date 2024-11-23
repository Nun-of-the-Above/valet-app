import { useForm } from "react-hook-form";

export function CreateSessionForm({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Mock creating a session
    console.log("Creating mock session with data:", data);
    // Mock success
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 flex max-w-md">
        <div className="relative w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6">
              <h2 className="text-lg font-medium">Skapa ny föreställning</h2>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Stäng</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="showDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Datum och tid
                  </label>
                  <input
                    {...register("showDate", { required: true })}
                    name="showDate"
                    type="datetime-local"
                    defaultValue="2022-02-11T18:00"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.showDate && (
                    <span className="text-sm text-red-500">
                      Detta måste vara med.
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Scen
                  </label>
                  <input
                    {...register("stage", { required: true })}
                    placeholder="Scen46, Oscarsteatern etc..."
                    name="stage"
                    type="text"
                    defaultValue="Scen46"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.stage && (
                    <span className="text-sm text-red-500">
                      Detta måste vara med.
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stad
                  </label>
                  <input
                    {...register("city", { required: true })}
                    placeholder="Stad"
                    name="city"
                    type="text"
                    defaultValue="Göteborg"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.city && (
                    <span className="text-sm text-red-500">
                      Detta måste vara med.
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="secretWord"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hemligt ord
                  </label>
                  <input
                    {...register("secretWord", { required: true })}
                    placeholder="Ordet användarna loggar in i appen med."
                    name="secretWord"
                    type="text"
                    defaultValue="falukorv"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.secretWord && (
                    <span className="text-sm text-red-500">
                      Detta måste vara med.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  SKAPA FÖRESTÄLLNING
                </button>
              </form>
            </div>

            <div className="flex justify-end border-t border-gray-200 px-4 py-6">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onClose}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
