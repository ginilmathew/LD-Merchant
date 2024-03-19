import { create } from 'zustand'

export const personalDetailsStore = create((set) => ({
    user_name: null,
    email_address: null,
    mobile_number: null,
    first_name: null,
    last_name: null,
    DOB: null,
    designation: null,
    password: null,
    confirm_password: null,
    updateUserDetails: (fieldName, value) => set((state) => ({ [fieldName]: value })),
}))

export const tabStore = create((set) => ({
    count: 1,
    title: 'Personal Details',
    updateCountIcrease: () => set((state) => ({ count: state.count < 6 ? state.count + 1 : state.count })),
    updateCountDecrease: () => set((state) => ({ count: state.count > 1 ? state.count - 1 : state.count })),
    updateTitle: () => set((state) => ({ title: getTitle(state.count) })),
}))


const getTitle = (count) => {
    switch (count) {
        case 1:
            return 'Personal Details';
        case 2:
            return 'Business Details';
        case 3:
            return 'Social Media Links';
        case 4:
            return 'Verification Method';
        default:
            return 'Personal Details'; 
    }
};
