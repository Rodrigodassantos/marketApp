import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ItemService } from '../item.service';
import { Item } from '../entities/item.entity'
import { Repository, UpdateResult } from 'typeorm';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto'


describe('ItemService', () => {
  let service: ItemService;
  let ItemRepository: Repository<Item>
  
  
  beforeEach(async () => {
   
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, {provide:  getRepositoryToken(Item),   
        useValue: {
          find: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          create: jest.fn(),
          preload: jest.fn(),
          save: jest.fn(),
      }}],
    }).compile();

    service = module.get<ItemService>(ItemService);
    ItemRepository = module.get<Repository<Item>>(getRepositoryToken(Item))
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(ItemRepository).toBeDefined();
  });


  describe('create', () => {
    it('should create a new item with sucess', async () => {

      const data: CreateItemDto ={
          name: "Bananas",
          description: "Cavendish bananas",
          quantity: 5,
          type: "cx"
      }

      const itemEntityMock = {...data} as Item 
        

      jest.spyOn(ItemRepository, 'create').mockReturnValueOnce(itemEntityMock)
      jest.spyOn(ItemRepository, 'save').mockResolvedValueOnce(itemEntityMock)
      
      const result = await service.create(data)
      
      expect(result).toBeDefined()
      expect(ItemRepository.create).toBeCalledTimes(1);
      expect(ItemRepository.save).toBeCalledTimes(1);
      
    })
  })
  
  describe('findAll', () =>{
    it('should find all items ', async () =>{
      
      const data = [{
        id: "b006a661-55ae-4bb7-a2b1-910dc922d7f2",
        updatedAt: new Date("2022-12-15T12:53:58.044Z"),
        name: "Bananas",
        description: "Cavendish bananas",
        quantity: 5,
        type: "cx"
      }]

      jest.spyOn(ItemRepository, 'find').mockResolvedValueOnce(data)

     const result = await service.findAll();

     expect(result).toEqual(data)

    })
  })

  describe('findOne', () => {
    it('should find one item', async () => {
      
      const data =
      {
        id: "b006a661-55ae-4bb7-a2b1-910dc922d7f2",
        updatedAt: new Date("2022-12-15T12:53:58.044Z"),
        name: "Bananas",
        description: "Cavendish bananas",
        quantity: 5,
        type: "cx"
      }
      jest.spyOn(ItemRepository, 'findOne').mockResolvedValueOnce(data)
  
      const result = await service.findOne(data.id)

      expect(result).toEqual(data)
    })
  })

  describe('update', () => {
    it('should find one item', async () => {
      const database =
      {
        id: "b006a661-55ae-4bb7-a2b1-910dc922d7f2",
        updatedAt: new Date("2022-12-15T12:53:58.044Z"),
        name: "Bananas",
        description: "Cavendish bananas",
        quantity: 10,
        type: "cx"
      } as Item 

      const data: UpdateItemDto ={
        
        name: "Bananas",
        description: "Cavendish bananas",
        quantity: 5,
        type: "cx"
    }
    const itemEntityMock = {...data} as UpdateResult 

  
      jest.spyOn(ItemRepository, 'preload').mockResolvedValueOnce(database)
      jest.spyOn(ItemRepository, 'save').mockResolvedValueOnce(database)
  
      console.log(ItemRepository)
      const result = await service.update(database.id, data)

      expect(result).toEqual(database)
    })

  })
  
});
