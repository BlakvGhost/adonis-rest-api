export class Utils {
  static async save_image(request: Record<string, any>, field: string = 'cover') {
    const data = {}
    const coverImage = request.file(field, {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (!coverImage) {
      return
    }

    if (!coverImage.isValid) {
      return coverImage.errors
    }

    await coverImage.moveToDisk('uploads')
    data[field] = await coverImage.fileName
    return data
  }
}
