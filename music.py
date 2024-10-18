class Node:
    def __init__(self, value):
        self.value = value  # Song title or any related data
        self.next = None    # Pointer to the next song
        self.prev = None    # Pointer to the previous song

class Playlist:
    def __init__(self):
        self.head = None         # Points to the first song in the playlist
        self.tail = None         # Points to the last song in the playlist
        self.current_song = None  # This will be the song currently playing

    # Add song to the beginning of the playlist
    def add_song_to_start(self, song):
        node = Node(song)
        if self.head:  # If there is a head, add the new node at the start
            node.prev = self.head
            self.head.next = node
        else:
            self.tail = node  # If the list is empty, set the node as both head and tail
        self.head = node
        if self.current_song is None:
            self.current_song = self.head  # Set as the current song if it's the first one

    # Add song to the end of the playlist
    def add_song_to_end(self, song):
        node = Node(song)
        if self.tail:  # If there is a tail, add the new node at the end
            node.next = self.tail
            self.tail.prev = node
        else:
            self.head = node  # If the list is empty, set the node as both head and tail
        self.tail = node
        if self.current_song is None:
            self.current_song = self.tail  # Set as the current song if it's the first one

    # Remove the current song
    def remove_current_song(self):
        if not self.current_song:  # If there's no song, return None
            return None
        removed_song = self.current_song.value  # Store the removed song's value

        if self.current_song.prev:  # If there's a previous song, move to it
            self.current_song = self.current_song.prev
            self.current_song.next = None  # Unlink the removed song
        else:
            self.current_song = self.current_song.next
            if self.current_song:  # If there's a next song, unlink it
                self.current_song.prev = None
        return removed_song

    # Skip to the next song
    def next_song(self):
        if not self.current_song or not self.current_song.prev:  # No next song
            return None
        self.current_song = self.current_song.prev
        return self.current_song.value  # Return the next song title

    # Go back to the previous song
    def previous_song(self):
        if not self.current_song or not self.current_song.next:  # No previous song
            return None
        self.current_song = self.current_song.next
        return self.current_song.value  # Return the previous song title

    # Print the current playlist
    def print_playlist(self):
        song_list = []
        current = self.head
        while current:
            song_list.append(current.value)
            current = current.prev
        print("Playlist:", song_list)


# Usage example
playlist = Playlist()

# Adding songs to the playlist
playlist.add_song_to_end("Song 1")
playlist.add_song_to_end("Song 2")
playlist.add_song_to_start("Song 3")  # Adds to the start
playlist.add_song_to_end("Song 4")

playlist.print_playlist()  # Playlist: ['Song 3', 'Song 1', 'Song 2', 'Song 4']

print("Current song:", playlist.current_song.value)  # Current song: Song 4

# Skip to the next song
print("Next song:", playlist.next_song())  # Next song: Song 2

# Go back to the previous song
print("Previous song:", playlist.previous_song())  # Previous song: Song 4

# Remove the current song
print("Removed song:", playlist.remove_current_song())  # Removed song: Song 4
playlist.print_playlist()  # Playlist: ['Song 3', 'Song 1', 'Song 2']
playlist.print_playlist()