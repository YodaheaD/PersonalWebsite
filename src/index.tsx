import { render } from "preact";

import preactLogo from "./assets/preact.svg";
import "./style.css";
import { useState } from "preact/hooks";

export function App() {
  const [displayFileInput, setDisplayFileInput] = useState(false);
  const [userEntry, setUserEntry] = useState("");

  return (
    <div class=" p-24 py-32 flex flex-col gap-4 items-center justify-center">
      <section>
        <div class="flex flex-row  justify-evenly w-full">
          <img src="/favicon.ico" alt="Preact logo" height="160" width="160" />
          <h1 class="text-5xl font-semibold flex flex-col font-sans my-auto">
            <span>Image</span>
            <span>Repository</span>
          </h1>
        </div>
        <FileInput />

        {/* {userEntry === key ? (
          <div class="block p-4 border rounded-lg shadow-md   flex flex-col gap-4">
            <h2 class="text-xl font-semibold">
              Enter Password To Upload Files
            </h2>
            <p class="mt-2 text-gray-600">
              Please enter the password to gain access to the file upload
              feature
            </p>
            <div class={"flex flex-row gap-2 "}>
              <input
                type="password"
                value={userEntry}
                placeholder={"Enter Password"}
                onInput={(e) =>
                  setUserEntry((e.target as HTMLInputElement).value)
                }
                class="block p-4 border w-3/4 rounded-lg shadow-md hover:bg-gray-100 transition"
              />
              <button
                onClick={checkUserToKey}
                class="block p-4 border w-1/4 rounded-lg shadow-md hover:bg-gray-100  m-2 transition"
              >
                Enter
              </button>
            </div>
        
          </div>
        ) : (
          <FileInput />
        )} */}
      </section>
    </div>
  );
}

function FileInput() {
  const [files, setFiles] = useState<File[]>([]);
  const key = import.meta.env.VITE_SOME_KEY;

  const [imageDateDay, setImageDateDay] = useState<number>(0);
  const [imageMonth, setImageMonth] = useState<number>(0);
  const [imageYear, setImageYear] = useState<number>(0);
  const [userEntry, setUserEntry] = useState("");
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      setFiles(Array.from(target.files));
    }
  };

  const returnUnixTimeStamp = () => {
    const date = new Date();
    date.setDate(imageDateDay);
    date.setMonth(imageMonth);
    date.setFullYear(imageYear);
    return date.getTime();
  };
  type uploadData = {
    description: string;
    imageName: string;
    notes: string;
    tags: string;
    dateTaken: Number;
    imagePath: string;
    filetype: string;
    uploader: string;
  };

  const handleSubmit = async (event: Event) => {
    // alert("Submitting with Date: " + returnUnixTimeStamp());
    /**
     *  [{"description":"","imageName":"BogotoToMedllin","notes":"","tags":"",
     * "dateTaken":"1736744400000","imagePath":"BogotoToMedllin.pdf","filetype":"pdf","uploader":"user email"},{"description":"","imageName":"Arlanda_ticket","notes":"","tags":"","dateTaken":"1736744400000","imagePath":"Arlanda ticket.pdf","filetype":"pdf","uploader":"user email"}]
     */
    event.preventDefault();
    const fileNamesHolder: uploadData[] = [];
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      fileNamesHolder.push({
      imagePath: files[i].name.replace(/ /g, "_"),
      dateTaken: returnUnixTimeStamp(),
      uploader: "ImageUploadApp",
      filetype: files[i].type.split("/")[1],
      imageName: files[i].name.split(".")[0].replace(/ /g, "_"),
      description: "",
      notes: "",
      tags: "",
      });
      formData.append("monfichier", files[i]);
    }
    formData.append("data", JSON.stringify(fileNamesHolder));
    console.log("data is");
    console.log(fileNamesHolder);
    // const response = await fetch(import.meta.env.VITE_SOME_URL_UPLOAD, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //   "Content-Type": "multipart/form-data",
    //   "Authorization": `Bearer ${import.meta.env.VITE_SOME_TOKEN}`,
    //   "Accept": "application/json",
    //   },
    // });

    // if(response.status === 201){
    //   alert("Files uploaded successfully");
    //   window.location.reload();
    // }
    // if (!response.ok) {
    //   throw new Error("File upload failed");
    // }
    // // if repsonse code is 400 or 500 then throw error and alert
    // if (response.status === 400 || response.status === 500) {
    //   throw new Error("File upload failed");
    // }
    // //
    // if (response.ok) {
    //   // alert and reload page
    //   alert("Files uploaded successfully");
    //   window.location.reload();
    // }

    // try {
    //   const response = await fetch(
    //     "http://10.0.0.131:3030/images/uploadImage/Yodahea",
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("File upload failed");
    //   }
    //   //
    //   if(response.ok){
    // 	// alert and reload page
    // 	alert("Files uploaded successfully");
    // 	window.location.reload();
    //   }

    //   //alert("Files uploaded successfully");
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    //   alert("Error uploading files");
    // }
  };

  return (
    <div class={"flex flex-col gap-4 items-center p-2"}>
      <div class={"flex flex-row gap-2 "}>
        <input
          type="password"
          value={userEntry}
          placeholder={"Enter Password"}
          onInput={(e) => setUserEntry((e.target as HTMLInputElement).value)}
          class="block p-4 border w-3/4 rounded-lg shadow-md hover:bg-gray-100 transition"
        />
      </div>

      {String(userEntry) === String(key) && (
        <form
          onSubmit={handleSubmit}
          class="block p-4 border rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          <div class="flex flex-row gap-2 mb-4 p-2">
            <select
              value={imageMonth}
              onChange={(e) =>
                setImageMonth(parseInt((e.target as HTMLSelectElement).value))
              }
              class="block p-2 border rounded-lg shadow-md transition"
            >
              <option value={0} disabled>
                Month
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <span class={"text-2xl font-bold my-auto"}>/</span>
            <select
              value={imageDateDay}
              onChange={(e) =>
                setImageDateDay(parseInt((e.target as HTMLSelectElement).value))
              }
              class="block p-2 border rounded-lg shadow-md transition"
            >
              <option value={0} disabled>
                Day
              </option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <span class={"text-2xl font-bold my-auto"}>/</span>
            <select
              value={imageYear}
              onChange={(e) =>
                setImageYear(parseInt((e.target as HTMLSelectElement).value))
              }
              class="block p-2 border rounded-lg shadow-md transition"
            >
              <option value={0} disabled>
                Year
              </option>
              {Array.from({ length: 27 }, (_, i) => i + 2000).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <input
            type="file"
            name="monfichier"
            multiple
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div class="mt-4 max-h-60 overflow-y-scroll">
              <h2 class="text-xl font-semibold">Uploaded Files</h2>
              <ul class="list-disc pl-5">
                {files.map((file) => (
                  <li key={file.name} class="mt-2 text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {files.length != 0 && (
            <button
              disabled={files.length === 0}
              type="submit"
              class="block p-4 border rounded-lg shadow-md hover:bg-gray-100 transition mt-4 disabled:opacity-50"
            >
              Send Files
            </button>
          )}
        </form>
      )}
    </div>
  );
}
render(<App />, document.getElementById("app"));
