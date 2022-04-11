import xml from "xml";

// Made this skeleton structure a long time ago. This seems to be the most
// minimal it can be but I don't remember correctly. Maybe compress it again?
// const skeletonElementXml = (count, title) => {
//   return {
//     SuperMemoElement: [
//       {
//         ID: 1,
//       },
//       {
//         Title: "Org Notes",
//       },
//       {
//         Type: "Topic",
//       },
//       {
//         Content: [
//           { Question: `${itemsJSON[i].id} - ${itemsJSON[i].link}` },
//           {
//             Answer: {
//               _cdata: `<P style="DISPLAY: block; font-size: 24px;">${itemsJSON[i].id} - ${itemsJSON[i].time}</P><IFRAME style="WIDTH: 80px;" src="${itemsJSON[i].link}"></IFRAME>`,
//             },
//           },
//         ],
//       },
//     ],
//   };
// };

const createXml = (content) => {
  const test = Object.keys(content);
  const skeletonXml = {
    SuperMemoElement: [
      // { Count: test.length + 1 },
      { ID: 1 },
      { Title: "Org Notes" },
      { Type: "Topic" },
    ],
  };

  test.forEach((something) => {
    const elementXml = {
      SuperMemoElement: [
        { ID: 2 },
        { Type: "Topic" },
        {
          Content: [
            {
              Question: {
                _cdata: `
                <h4 style="DISPLAY: block; font-size: 24px;">${
                  content[something].name
                }</h4>
                <p>marker: ${content[something].marker}</p>
                <p>pathMd5: ${content[something].pathMd5}</p>
                <p>fileMd5: ${content[something].fileMd5}</p>
                <p>AbsPath: ${something}</p>
                <p>WinPath Link: <a href="file:///Z:${something.substring(
                  11
                )}">file:///Z:${something.substring(11)}</a></p>
                <p>WinPath: file:///Z:${something.substring(11)}</p>
                <iframe style="width: 80px; background-color: purple; border: 20px solid purple" 
                src="org-protocol://open-file?file=${something}" frameborder="0"></iframe>`,
              },
            },
          ],
        },
      ],
    };
    skeletonXml.SuperMemoElement.push(elementXml);
  });

  return xml(skeletonXml);
};

export { createXml };
