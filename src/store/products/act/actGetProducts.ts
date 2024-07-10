import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isAxiosError } from "axios";

interface FetchProductsParams {
  status?: string;
  category?: string;
}

const actGetProduct = createAsyncThunk(
  "product/getProduct",
  async (params: FetchProductsParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const query = new URLSearchParams();
      if (params.status)
        query.append("filters[statuses][title][$eq]", params.status);
      if (params.category)
        query.append("filters[category][title][$eq]", params.category);
      query.append("populate", "*");
      const response = await axios.get(
        `http://localhost:1337/api/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export default actGetProduct;
