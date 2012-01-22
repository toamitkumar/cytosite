class ImagesController < ApplicationController
  layout 'common'
  before_filter :admin_resource?, :except => [:show, :index]

  def index
    @images = Image.all
    @images = @images.select{|cat| cat.category_code == params[:category_code]} unless params[:category_code].blank?
    @categories = Category.find(:all,
      :conditions => ['code in (?)', @images.map(&:category_code)],
      :order => :name) unless @images.empty?
  end

  def show
    @image = Image.find(params[:id])
    @category = Category.find_by_code(@image.category_code)
  end

  def new
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def edit
    @image = Image.find(params[:id])
    @categories = Category.all(:order => 'sort_order').collect { |c| [c.name, c.code]}
  end

  def create
    Image.transaction do
      format = params[:upload]['datafile'].original_filename.split('.').last
      params[:image][:format] = format
      image = Image.create!(params[:image])
      ImageFile.save(params[:upload], image.id, format)
      ImageFile.save_thumbnail(image.id, format)
    end
    redirect_to images_path
  end

  def update
    Image.transaction do
      Image.find(params[:id]).update_attributes!(params[:image])
    end
    redirect_to images_path
  end

  def tags
    render :text => '[{"ID":1,"LEFT":"30.23952095808383","TOP":"32.6","WIDTH":"46.10778443113772","HEIGHT":"31.6","DATE":{"Y":"2010","M":"04","D":"30","H":"12","I":"55"},"NOTE":"visit Flickr","AUTHOR":"Lukas","LINK":"http:\/\/www.flickr.com\/photos\/lugat\/"}]'
  end

end