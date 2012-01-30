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

end
