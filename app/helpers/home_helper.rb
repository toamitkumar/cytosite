module HomeHelper

  def category_tree_data(categories, code)
    root_node = categories.select{|cat| cat.code == code}.first
    json_string = node_start(root_node)
    first_level_children = categories.select{|cat| cat.parent_id == root_node.id}
    fl_children = []
    first_level_children.each do |fl_child|
      fl_child_str = node_start(fl_child)
      second_level_children = categories.select{|cat| cat.parent_id == fl_child.id}
      sl_children = []
      second_level_children.each do |sl_child|
        sl_child_str = node_start(sl_child)
        third_level_children = categories.select{|cat| cat.parent_id == sl_child.id}
        tl_children = []
        third_level_children.each do |tl_child|
          tl_child_str = node_start(tl_child) + node_end
          tl_children << tl_child_str
        end
        if tl_children.empty?
          sl_child_str += node_end
        else
          sl_child_str += tl_children.join(',') + node_end
        end
        sl_children << sl_child_str
      end
      fl_child_str += sl_children.join(',') + node_end
      fl_children << fl_child_str
    end
    json_string += fl_children.join(',')
    json_string += node_end
  end

  private
  def node_start(node)
    '{"id": "node' + node.id.to_s + '","name": "' + node.name  + '",' +
    '"data": {"level":' + node.level.to_s + ', "code":"' + node.code + '"},"children": ['
  end

  def node_end
    ']}'
  end

end