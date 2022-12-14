import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
 constructor(@InjectRepository(Item) private readonly repository: Repository<Item>) { }

 async create(data: CreateItemDto): Promise<Item> {
   return this.repository.save(this.repository.create(data)); 
 }

 findAll(query: PaginateQuery): Promise<Paginated<Item>> {
   return paginate(query, this.repository, {
    sortableColumns: ['id', 'name'],
    nullSort: 'last',
    searchableColumns: ['name'],
    defaultSortBy: [['id', 'DESC']],
  })
 }

  findOne(id: string): Promise<Item> {
   return this.repository.findOne({where: {id}});
 }

 async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
   const item = await this.repository.preload({
     id: id,
     ...updateItemDto,
   });
   if (!item) {
     throw new NotFoundException(`Item ${id} not found`);
   }
   console.log(item)
   return this.repository.save(item);
 }

 async remove(id: string) {
   const item = await this.findOne(id);
   return this.repository.remove(item);
 }
}
