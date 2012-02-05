class Image < ActiveRecord::Base
  has_many :image_tags

  def self.create_with_s3(params)
    transaction do
      format = params[:upload]['datafile'].original_filename.split('.').last
      params[:image][:format] = format
      image = Image.create!(params[:image])
      
      ImageFile.save_with_thumbnail(params[:upload], image.id, format)
    end
  end
end