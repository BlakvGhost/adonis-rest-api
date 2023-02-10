export class BaseController {
  protected async handleResponse(response: any, result: Array<any>, msg: string) {
    const res = {
      success: true,
      data: result,
      message: msg,
    }
    return response.json({
      data: res,
      code: 200,
    })
  }
  protected async handleError(result: Array<any>, msg: string, code: number = 400) {
    const res = {
      success: false,
      data: result,
      message: msg,
    }
    return {
      data: res,
      code: code,
    }
  }
}
