import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { response } from 'express';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../entities/item.entity';
import { ItemController } from '../item.controller';
import { ItemModule } from '../item.module';
import { ItemService } from '../item.service';


 const itemEntityList: Item[]= [
   new Item(
      {
        id: "b006a661-55ae-4bb7-a2b1-910dc922d7f2",
        updatedAt: new Date(),
        name: "Bananas",
        description: "Cavendish bananas",
        quantity: 5,
        type: "cx"
      }
    )
 ]

 const itemEntity =
   {
     id: "b006a661-55ae-4bb7-a2b1-910dc922d7f2",
     updatedAt: "2022-12-15T12:53:58.044Z",
     name: "Bananas",
     description: "Cavendish bananas",
     quantity: 5,
     type: "cx"
   }
     

   const body: CreateItemDto ={
    name: "Bananas",
    description: "Cavendish bananas",
    quantity: 5,
    type: "cx"
}

const updatedBody: UpdateItemDto ={
    name: "Bananas",
    description: "Cavendish bananas",
    quantity: 5,
    type: "cx"
}

const itemEntityMock = {...body} as Item 

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
           useValue:{ 
            create: jest.fn().mockResolvedValue(itemEntityMock),
            update: jest.fn().mockResolvedValue(itemEntityMock),
            findAll: jest.fn().mockResolvedValue(itemEntityList), 
            findOne: jest.fn().mockResolvedValue(itemEntity),
            remove: jest.fn().mockResolvedValue(itemEntity)
          }
        }
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service =  module.get<ItemService>(ItemService);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a item with a sucess', async () => {

   /*  jest.spyOn(service, 'create').mockResolvedValueOnce(itemEntityMock) */
      const result = await controller.create(body)

      expect(result).toBeDefined()
      expect(service.create).toBeCalledTimes(1)
    })
  })

   describe('get items', () => {
    it('should return a list of items ',async () => {

      const teste = await controller.findAll()
  
      expect(teste).toEqual(itemEntityList)

    })

  })   

  describe('get a single item ', () => {
    it('should retrive a single item', async () => {
      const result = await controller.findOne(itemEntity.id)

      expect(result).toEqual(itemEntity)
    })
  })

  describe('update an item', () => {
    it('should update an item ', async () => {
      const result = await controller.update(itemEntity.id, body)

      expect(result).toBeDefined()
      expect(result).toEqual(updatedBody)
    })
  })

  describe('delete a single item ', () => {
    it('should delete a single item', async () => {
      const result = await controller.remove(itemEntity.id)

      expect(result).toEqual(itemEntity)
    })
  })

});


   
