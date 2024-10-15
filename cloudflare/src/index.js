/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
	try {
	  // Parse the form data from the request
	  let input = await context.request.formData();
  
	  // Convert FormData to JSON
	  // This allows multiple values per key
	  let output = {};
	  for (let [key, value] of input) {
		let tmp = output[key];
		if (tmp === undefined) {
		  output[key] = value;
		} else {
		  output[key] = [].concat(tmp, value);
		}
	  }
  
	  // Return the JSON response
	  let pretty = JSON.stringify(output, null, 2);
	  return new Response(pretty, {
		headers: {
		  "Content-Type": "application/json;charset=utf-8",
		},
	  });
	} catch (err) {
	  // Handle errors
	  return new Response("Error parsing JSON content", { status: 400 });
	}
  }