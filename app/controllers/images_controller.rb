class ImagesController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index]

  def index
    @images = Image.all
    @images = @images.select{|cat| cat.category_code == params[:category_code]} unless params[:category_code].blank?
    @categories = category_format
  end

  def show
    @image = Image.find(params[:id])
    @category = Category.find_by_code(@image.category_code)
  end

  def new
    @categories = category_format
  end

  def edit
    @image = Image.find(params[:id])
    @categories = category_format
  end

  def create
    Image.create_with_s3(params)
    redirect_to images_path
    
    # Image.transaction do
    #   format = params[:upload]['datafile'].original_filename.split('.').last
    #   params[:image][:format] = format
    #   image = Image.create!(params[:image])
    #   ImageFile.save(params[:upload], image.id, format)
    #   ImageFile.save_thumbnail(image.id, format)
    # end
    # redirect_to images_path
  end

  def update
    Image.transaction do
      Image.find(params[:id]).update_attributes!(params[:image])
    end
    redirect_to images_path
  end

  def category_images
    @images = Image.find_all_by_category_code(params[:id])
    render :partial => 'category_images'
  end

end