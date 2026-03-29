import api, { Response } from "@/lib/other_api";

class SportTypeService {
  private static instance: SportTypeService;
  private basePath = '/facility/sports';

  private constructor() {}

  public static getInstance(): SportTypeService {
    if (!SportTypeService.instance) {
      SportTypeService.instance = new SportTypeService();
    }
    return SportTypeService.instance;
  }

  async getAllTypes(): Promise<Response> {
    try {
      const response = await api.get(`${this.basePath}/get/all`);
      
      return response.data;

    } catch (error : any) {
      console.error('Error fetching fields:', error);
      return error.response.data;
    }
  }

}

export default SportTypeService.getInstance();