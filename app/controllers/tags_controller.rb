class TagsController < ApplicationController
  before_filter :admin_resource?, :except => [:show]

  def show
    tags = ImageTag.find_all_by_image_id(params[:id])
    tags_array = []
    tags.each do|tag|
      date = tag.updated_at
      tags_array << '{"ID":"' + tag.id.to_s + '","LEFT":"' + tag.left.to_s + '",' +
        '"TOP":"' + tag.top.to_s + '","WIDTH":"' + tag.width.to_s + '",' +
        '"HEIGHT":"' + tag.height.to_s + '","NOTE":"' + tag.note + '",' +
        '"AUTHOR":"' + tag.author + '",' + '"DATE":{"Y":"' + date.year.to_s + '",' +
        '"M":"' + date.month.to_s + '",' + '"D":"' + date.day.to_s + '",' +
        '"H":"' + date.hour.to_s + '","I":"' + date.min.to_s + '"}}'
    end
    render :text => '[' + tags_array.join(',') + ']'
  end

  def create
    params[:tag][:author] = current_user.name
    ImageTag.create!(params[:tag])
    render :nothing => true
  end

  def destroy
    ImageTag.destroy(params[:id])
    render :nothing => true
  end

end
