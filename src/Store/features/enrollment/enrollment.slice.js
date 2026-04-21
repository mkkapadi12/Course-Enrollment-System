import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enrollmentAPI } from "./enrollment.api";

const initialState = {
  enrollments: [],
  adminEnrollments: [],
  loading: false,
  error: null,
};

export const enroll = createAsyncThunk(
  "enrollment/enroll",
  async (courseId, { rejectWithValue, dispatch }) => {
    try {
      const response = await enrollmentAPI.enroll(courseId);
      dispatch(getMyEnrollments());
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "something went wrong",
      );
    }
  },
);

export const getMyEnrollments = createAsyncThunk(
  "enrollment/getMyEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.getMyEnrollments();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "something went wrong",
      );
    }
  },
);

export const getPendingRequests = createAsyncThunk(
  "enrollment/getPendingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.getPendingRequests();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "something went wrong",
      );
    }
  },
);

export const approveOrReject = createAsyncThunk(
  "enrollment/approveOrReject",
  async (
    { enrollmentId, status, rejectionReason },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await enrollmentAPI.approveOrReject(
        enrollmentId,
        status,
        rejectionReason,
      );
      dispatch(getMyEnrollments());
      dispatch(getPendingRequests());
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "something went wrong",
      );
    }
  },
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(enroll.pending, (state) => {
        state.loading = true;
      })
      .addCase(enroll.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments.push(action.payload);
      })
      .addCase(enroll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
      })
      .addCase(getMyEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.adminEnrollments = action.payload.enrollments;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveOrReject.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveOrReject.fulfilled, (state, action) => {
        state.loading = false;
        state.adminEnrollments = state.adminEnrollments.filter(
          (enrollment) => enrollment._id !== action.payload._id,
        );
      })
      .addCase(approveOrReject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enrollmentSlice.reducer;
