import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  healthConcerns: [],
  dietPreferences: [],
  allergies: [],
  lifestyle: null,
  formErrors: {
    healthConcerns: null,
    dietPreferences: null,
    allergies: null,
    lifestyle: null,
  },
  formProgress: {
    healthConcerns: false,
    dietPreferences: false,
    allergies: false,
    lifestyle: false,
  },
  currentStep: 1,
  totalSteps: 4,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    resetQuestionnaire: state => {
      return {...initialState};
    },
    saveHealthConcerns: (state, action) => {
      const concerns = action.payload;
      if (!concerns || concerns.length === 0) {
        state.formErrors.healthConcerns =
          'Please select at least one health concern';
        state.formProgress.healthConcerns = false;
      } else if (concerns.length > 5) {
        state.formErrors.healthConcerns = 'Maximum 5 health concerns allowed';
        state.formProgress.healthConcerns = false;
      } else {
        state.healthConcerns = concerns;
        state.formErrors.healthConcerns = null;
        state.formProgress.healthConcerns = true;
      }
    },
    saveDietPreferences: (state, action) => {
      const diet = action.payload;
      if (!diet) {
        state.formErrors.dietPreferences = 'Please select a diet preference';
        state.formProgress.dietPreferences = false;
      } else {
        state.dietPreferences = diet;
        state.formErrors.dietPreferences = null;
        state.formProgress.dietPreferences = true;
      }
    },
    saveAllergies: (state, action) => {
      const allergies = action.payload;
      if (allergies && Array.isArray(allergies)) {
        state.allergies = allergies;
        state.formErrors.allergies = null;
        state.formProgress.allergies = true;
      } else {
        state.formErrors.allergies = 'Invalid allergies data';
        state.formProgress.allergies = false;
      }
    },
    saveLifestyle: (state, action) => {
      const {sunExposure, smoking, alcohol} = action.payload;
      if (!sunExposure || !smoking || !alcohol) {
        state.formErrors.lifestyle = 'Please answer all lifestyle questions';
        state.formProgress.lifestyle = false;
      } else {
        state.lifestyle = action.payload;
        state.formErrors.lifestyle = null;
        state.formProgress.lifestyle = true;
      }
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearError: (state, action) => {
      const field = action.payload;
      if (state.formErrors[field]) {
        state.formErrors[field] = null;
      }
    },
  },
});

export const {
  resetQuestionnaire,
  saveHealthConcerns,
  saveDietPreferences,
  saveAllergies,
  saveLifestyle,
  setCurrentStep,
  clearError,
} = questionnaireSlice.actions;

// Selectors
export const selectFormProgress = state => state.questionnaire.formProgress;
export const selectFormErrors = state => state.questionnaire.formErrors;
export const selectCurrentStep = state => state.questionnaire.currentStep;
export const selectTotalSteps = state => state.questionnaire.totalSteps;

export default questionnaireSlice.reducer;
