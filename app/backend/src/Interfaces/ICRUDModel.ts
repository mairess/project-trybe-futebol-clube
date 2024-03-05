export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>

}

// export interface ICRUDModel<T> extends ICRUDModelReader<T> { }
