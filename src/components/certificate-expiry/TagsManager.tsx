import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Tag } from 'lucide-react';
import { QUICK_TAGS } from '@/types/expiryTypes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TagsManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
}

export const TagsManager = ({ tags = [], onTagsChange, disabled }: TagsManagerProps) => {
  const [customTag, setCustomTag] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(t => t !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !tags.includes(customTag.trim())) {
      onTagsChange([...tags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const availableQuickTags = QUICK_TAGS.filter(tag => !tags.includes(tag));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            <Tag className="h-3 w-3" />
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag)}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 gap-1"
              disabled={disabled}
            >
              <Plus className="h-3 w-3" />
              Add Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-64 max-w-sm" align="start">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Quick Tags</p>
                <div className="flex flex-wrap gap-2">
                  {availableQuickTags.length > 0 ? (
                    availableQuickTags.map(tag => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          handleAddTag(tag);
                          if (availableQuickTags.length === 1) setIsOpen(false);
                        }}
                      >
                        {tag}
                      </Button>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">All quick tags added</p>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Custom Tag</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter tag name"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                    className="h-9 sm:h-8 text-base sm:text-sm"
                  />
                  <Button 
                    size="sm" 
                    className="h-9 sm:h-8 px-4 min-w-[60px]" 
                    onClick={handleAddCustomTag}
                    disabled={!customTag.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
