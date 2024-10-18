// this a practical example of a linked list using a music playlist

class Node {
    constructor(value, next, prev) {
      this.value = value;  // This will store the song title or any related data
      this.next = next;    // Pointer to the next song
      this.prev = prev;    // Pointer to the previous song
    }
  }
  
  class Playlist {
    constructor() {
      this.currentSong = null;  // This will be the song currently playing
      this.head = null;         // Points to the first song in the playlist
      this.tail = null;         // Points to the last song in the playlist
    }
  
    // Add song to the beginning of the playlist
    addSongToStart(song) {
      const node = new Node(song, null, this.head);
      if (this.head) this.head.next = node;
      else this.tail = node;  // If the playlist is empty, set as both head and tail
      this.head = node;
      this.currentSong = this.currentSong || this.head;  // If it's the first song, set as the current song
    }
  
    // Add song to the end of the playlist
    addSongToEnd(song) {
      const node = new Node(song, this.tail, null);
      if (this.tail) this.tail.prev = node;
      else this.head = node;  // If playlist is empty, set as both head and tail
      this.tail = node;
      this.currentSong = this.currentSong || this.tail;  // If it's the first song, set as the current song
    }
  
    // Remove the current song
    removeCurrentSong() {
      if (!this.currentSong) return null;  // If there's no song, return null
      const removedSong = this.currentSong.value;  // Store the removed song's value
  
      // If there's a next song, move to it; otherwise, move to the previous one
      if (this.currentSong.prev) {
        this.currentSong = this.currentSong.prev;
        this.currentSong.next = null;  // Unlink the removed song
      } else {
        this.currentSong = this.currentSong.next;
        this.currentSong.prev = null;  // Unlink the removed song
      }
  
      return removedSong;
    }
  
    // Skip to the next song
    nextSong() {
      if (!this.currentSong || !this.currentSong.prev) return null;  // No next song
      this.currentSong = this.currentSong.prev;
      return this.currentSong.value;  // Return the next song title
    }
  
    // Go back to the previous song
    previousSong() {
      if (!this.currentSong || !this.currentSong.next) return null;  // No previous song
      this.currentSong = this.currentSong.next;
      return this.currentSong.value;  // Return the previous song title
    }
  
    // Print the current playlist
    printPlaylist() {
      let songList = [];
      let current = this.head;
      while (current) {
        songList.push(current.value);
        current = current.prev;
      }
      console.log("Playlist: ", songList);
    }
  }
  
  // Usage example
  const playlist = new Playlist();
  
  // Adding songs to the playlist
  playlist.addSongToEnd("Song 1");
  playlist.addSongToEnd("Song 2");
  playlist.addSongToStart("Song 3");  // Adds to the start
  playlist.addSongToEnd("Song 4");
  playlist.addSongToEnd("Song 4");
  
  playlist.printPlaylist();  // Playlist: ["Song 3", "Song 1", "Song 2", "Song 4"]
  
  console.log("Current song:", playlist.currentSong.value);  // Current song: Song 4
  
  // Skip to the next song
  console.log("Next song:", playlist.nextSong());  // Next song: Song 2
  
  // Go back to the previous song
  console.log("Previous song:", playlist.previousSong());  // Previous song: Song 4
  
  // Remove the current song
  console.log("Removed song:", playlist.removeCurrentSong());  // Removed song: Song 4

  console.log("Next song:", playlist.nextSong());  // Next song: Song 2
  console.log("Next song:", playlist.nextSong());  // Next song: Song 2
  console.log("Removed song:", playlist.removeCurrentSong());
  console.log("Current song:", playlist.currentSong.value);
  
  playlist.printPlaylist();  // Playlist: ["Song 3", "Song 1", "Song 2"]
  