export interface IOrder {
  id:string,
  name_status:string,
  name_product:string,
  cost:number,
  count:number,
  descriptions:string,
  product_cost:number,
  product_count:number,
  product_id:number,
  photo_link:string,
  order_statuses_id:string,
  firstname:string,
  patronymic:string,
  lastname:string
  user_id:string
}


export interface IOrderStatus {
  id:string,
  name_status:string,
}


