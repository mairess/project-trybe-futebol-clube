import { ID } from '.';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>
  findById(id: ID): Promise<T | null>,
}

// export interface ICRUDModel<T> extends ICRUDModelReader<T> { }
