export function trimData (object: any) {

   for (const key in object) {
      if (typeof object[key] === "string") {
         object[key] = object[key].trim();
      } else {
         object[key] = object[key]
      }
   }

   return object;
}