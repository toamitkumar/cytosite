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

end
