module ApplicationHelper

  def compute_nav_style(link_name, link_url, controller)
    is_link = params[:controller] != controller
    elem = if is_link
      link_to link_name, link_url
    else
      "<strong>#{link_name}</strong>"
    end
    elem
  end
  
  def render_flash(custom_flash = nil)
    message = custom_flash || flash
    flash_types = [:alert, :error, :success]
    flash_type = flash_types.detect { |a| message.keys.include?(a) && message[a.to_sym].present? }
    raw "<div id='flash_%s_div' class='%s'>%s</div>" % [flash_type.to_s, flash_type.to_s, message[flash_type]] if flash_type
  end

  def image_tag_json(id)
    tags = ImageTag.find_all_by_image_id(params[:id])
    tags_array = []
    tags.each do|tag|
      date = tag.updated_at
      note = tag.note.gsub(/\"/, "'")
      tags_array << '{"ID":"' + tag.id.to_s + '","LEFT":"' + tag.left.to_s + '",' +
        '"TOP":"' + tag.top.to_s + '","WIDTH":"' + tag.width.to_s + '",' +
        '"HEIGHT":"' + tag.height.to_s + '","NOTE":"' + note.strip + '",' +
        '"AUTHOR":"' + tag.author + '",' + '"DATE":{"Y":"' + date.year.to_s + '",' +
        '"M":"' + date.month.to_s + '",' + '"D":"' + date.day.to_s + '",' +
        '"H":"' + date.hour.to_s + '","I":"' + date.min.to_s + '"}}'
    end
    '[' + tags_array.join(',') + ']'
  end

end
