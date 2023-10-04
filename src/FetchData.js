/** @format */
export const fetchUniversities = async () => {
  try {
    const response = await fetch(
      "http://universities.hipolabs.com/search?country=United+States",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch universities.");
    }
    const data = await response.json();
    return data.slice(0, 20);
  } catch (error) {
    throw error;
  }
};
