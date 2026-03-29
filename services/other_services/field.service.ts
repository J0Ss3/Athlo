import api, { Response } from "@/lib/other_api";

class FieldService {
  private static instance: FieldService;
  private basePath = '/facility/field';

  private constructor() {}

  public static getInstance(): FieldService {
    if (!FieldService.instance) {
      FieldService.instance = new FieldService();
    }
    return FieldService.instance;
  }

  async getAllFields(
    page: number = 1,
    size: number = 10,
    sort: number = 0,
    param: string = "rating"
  ): Promise<Response> {
    try {
      const response = await api.get(`${this.basePath}/get/all/${page}/${size}/${sort}/${param}`);
      
      return response.data;

    } catch (error: any) {
      console.error('Error fetching fields:', error);
      return error.response;
    }
  }

  async getFieldsBySportType(
    sportTypeId: number,
    page: number = 1,
    size: number = 10,
    sort: number = 0,
    param: string = "rating"
  ): Promise<Response> {
    try {
      // Este es un endpoint adicional que podrías necesitar implementar
      const response = await api.get(`${this.basePath}/get/sport/${sportTypeId}/${page}/${size}/${sort}/${param}`);
      
      return response.data;
      
    } catch (error : any) {
      console.error('Error fetching fields:', error);
      return error.response;
    }
  }
}

export default FieldService.getInstance();