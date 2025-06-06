from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user is the creator
        is_creator = hasattr(obj, 'creator') and obj.creator == request.user

        # Check if the user is in selected_by (if it exists)
        is_selected = hasattr(obj, 'selected_by') and request.user in obj.selected_by.all()

        # Allow access only if the user is creator or selected
        return is_creator or is_selected