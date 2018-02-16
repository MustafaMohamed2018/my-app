export interface info{
	address?:string,	
	city?:string,
	email?:string,
	fullName?:string,
	state?:string,
	zipCode?:string,
}

export interface order {
	date?:string,
	modifier?:string,
	userId?:string,
	info?:info,
	items?:{any},
}