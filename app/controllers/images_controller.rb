class ImagesController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index]
  before_filter :initialize_categories, :only => [:index, :new, :edit]

  def index
    @images = if(params[:category_code].blank?) 
          Image.includes(:category)
        else
          Image.where(:category_code => params[:category_code]).includes(:category)
        end
    @selected_category = params[:category_code]
  end

  def show
    @image = Image.find(params[:id])
    @category = Category.find_by_code(@image.category_code)
  end

  def new
  end

  def edit
    @image = Image.find(params[:id])
  end

  def create
    Image.create_with_s3(params)
    redirect_to images_path
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

  def destroy
    Image.delete_with_s3(params[:id])
    redirect_to images_url
  end
end