"use client";
import { useForm } from "react-hook-form";

type defectForm = {
  module: string;
  useCase: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  priority: string;
  owner: string;
  status: string;
  defectId: string;
  notes: string;
};

export default function DefectForm() {
  const { register, handleSubmit, reset, getValues } = useForm<defectForm>({
    defaultValues: {
      preconditions: "User logged in",
    },
  });

  const onSubmit = async (data: defectForm) => {
    try {
      const response = await fetch(
        "http://localhost:5678/webhook-test/b159d7a4-a197-447d-af7a-02833f5e67eb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Preserve Module, Preconditions, and Steps; reset Defect ID to empty
      const currentValues = getValues();
      reset({
        module: currentValues.module,
        preconditions: currentValues.preconditions,
        steps: currentValues.steps,
        useCase: "",
        expectedResult: "",
        priority: "",
        owner: "Hasib",
        status: "",
        defectId: "",
        notes: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data.");
    }
  };
  const handleReset = () => {
      const currentValues = getValues();
    reset({
      module: currentValues.module,
      preconditions: currentValues.preconditions,
      steps: currentValues.steps,
      useCase: "",
      status: "",
      notes: "",
      expectedResult: "",
      priority: currentValues.priority,
      owner: "Hasib",
      defectId: currentValues.defectId,
    });
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex items-center mb-6 gap-6">
          <h1 className="text-2xl font-bold text-center  text-gray-800">
            Defect Tracking Form
          </h1>
          <button
            onClick={handleReset}
            className="px-6 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
          >
            {" "}
            Rest{" "}
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          {/* Module */}
          <div>
            <label className="block font-medium text-gray-700">Module</label>
            <input
              {...register("module")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter module name"
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block font-medium text-gray-700">
              Use Case / Scenario
            </label>
            <input
              {...register("useCase")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Describe the use case"
            />
          </div>

          {/* Preconditions */}
          <div>
            <label className="block font-medium text-gray-700">
              Preconditions
            </label>
            <select
              {...register("preconditions")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Item</option>
              <option value="User exists">User exists</option>
              <option value="User logged in">User logged in</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block font-medium text-gray-700">Priority</label>
            <select
              {...register("priority")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Expected Result */}
          <div>
            <label className="block font-medium text-gray-700">
              Expected Result
            </label>
            <textarea
              {...register("expectedResult")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="What should happen?"
            />
          </div>

          {/* Steps */}
          <div>
            <label className="block font-medium text-gray-700">Steps</label>
            <textarea
              {...register("steps")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Describe steps to reproduce"
            />
          </div>

          {/* Owner */}
          <div>
            <label className="block font-medium text-gray-700">Owner</label>
            <input
              {...register("owner")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter owner name"
              defaultValue="Hasib"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              {...register("status")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            >
              <option value="">Select status</option>
              <option value="Pass">Pass</option>
              <option value="Failed">Fail</option>
              <option value="NotRun">NotRun</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Defect ID / Link */}
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">
              Defect ID / Link
            </label>
            <input
              {...register("defectId")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter defect ID or link"
            />
          </div>

          {/* Notes */}
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">Notes</label>
            <textarea
              {...register("notes")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Additional notes"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
1. Make form 2 column
2. don't clear Module field after submit.
3. precondition field should be in select. SelectItem, User exists, User logged in(make it default) and don't clear after submit
4. Don't reset steps field after submit.
5. Delete Defect ID / Link. (make it empty)
*/
