/*
state: {
	id: string,
	title: string,
	pages: Array<{
		id: string,
		pageNumber: int,
		style: string,
		body: string
	}>
}
*/

export function documentReducer (state, { type, payload }) {
	switch (type) {
		case "SET_PAGE":
			return {
				...state,
				pages: state.pages.map(
					(page) => page.id === payload.id ? payload : page
				)
			};
		default:
			throw new Error(`Unhandled action type: ${type}`);
	}
}