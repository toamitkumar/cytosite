class Image < ActiveRecord::Base
  has_many :image_tags
  belongs_to :category, :foreign_key => :category_code, :primary_key => :code

  def self.create_with_s3(params)
    transaction do
      format = params[:upload]['datafile'].original_filename.split('.').last
      params[:image][:format] = format
      image = Image.create!(params[:image])
      
      ImageFile.save_with_thumbnail(params[:upload], image.id, format)
    end
  end

  def self.delete_with_s3(id)
  	transaction do
  		image = Image.find(id)
  		ImageFile.delete_from_s3(image.id, image.format)
  		image.destroy
  	end
  end

end