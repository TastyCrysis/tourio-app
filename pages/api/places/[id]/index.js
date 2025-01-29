import Place from "../../../../db/models/place";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    try {
      const foundPlace = await Place.findById(id);
      if (!foundPlace) {
        response.status(404).json({ status: "Place not found" });
        return;
      }
      response.status(200).json(foundPlace);
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "Error fetching place" });
      return;
    }
  }

  if (request.method === "PUT") {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(id, request.body);
      response.status(200).json(updatedPlace);
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "Error updating place" });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      response.status(200).json({ status: "Place deleted" });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "Error deleting place" });
      return;
    }
  }
}
