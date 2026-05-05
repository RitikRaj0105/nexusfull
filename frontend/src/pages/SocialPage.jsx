import React, { useState } from 'react'
import { Users, Trophy, Flame, Plus, Lock, Mic, Video } from 'lucide-react'
import { leaderboard, studyRooms } from '../data/mockData'
import { Avatar } from '../components/ui'

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('rooms')

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Social Hub</h1>
        <p className="text-slate-500 mt-1">Study together, compete, and keep each other accountable</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 w-fit">
        {[
          { id: 'rooms', label: '📚 Study Rooms' },
          { id: 'leaderboard', label: '🏆 Leaderboard' },
          { id: 'challenges', label: '⚡ Challenges' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Study Rooms */}
      {activeTab === 'rooms' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{studyRooms.filter(r => r.active).length} rooms live now</p>
            <button className="flex items-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-200">
              <Plus size={16} /> Create Room
            </button>
          </div>

          {studyRooms.map((room) => (
            <div key={room.id} className={`card p-5 ${room.active ? 'border-emerald-200 bg-emerald-50/30' : 'opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${room.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    <span className="font-semibold text-slate-800">{room.name}</span>
                  </div>
                  <p className="text-sm text-slate-500">{room.topic}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Users size={14} />
                  <span>{room.members}/{room.maxMembers}</span>
                </div>
              </div>

              {/* Member avatars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: Math.min(room.members, 5) }).map((_, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                    ['from-indigo-400 to-violet-500', 'from-cyan-400 to-blue-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500', 'from-emerald-400 to-teal-500'][i % 5]
                  } border-2 border-white flex items-center justify-center text-xs text-white font-bold -ml-1 first:ml-0`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {room.members > 5 && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-600 font-bold -ml-1">
                    +{room.members - 5}
                  </div>
                )}
                <span className="text-xs text-slate-400 ml-2">studying now</span>
              </div>

              <div className="flex items-center gap-2">
                <button disabled={!room.active} className={`flex items-center gap-1.5 py-2 px-4 text-sm font-semibold rounded-xl transition-all ${
                  room.active
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}>
                  {room.active ? 'Join Room' : <><Lock size={12} /> Ended</>}
                </button>
                {room.active && (
                  <>
                    <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"><Mic size={15} /></button>
                    <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"><Video size={15} /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-display font-semibold text-slate-800 flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" /> Weekly Rankings
            </h3>
            <p className="text-xs text-slate-400 mt-1">Resets every Monday · Based on XP earned</p>
          </div>

          <div className="divide-y divide-slate-50">
            {leaderboard.map((user) => (
              <div key={user.rank}
                className={`flex items-center gap-4 px-5 py-4 ${user.isMe ? 'bg-indigo-50/60' : 'hover:bg-slate-50'} transition-colors`}>
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  user.rank === 1 ? 'bg-amber-100 text-amber-700' :
                  user.rank === 2 ? 'bg-slate-100 text-slate-600' :
                  user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-50 text-slate-500'
                }`}>
                  {user.rank <= 3 ? ['🥇','🥈','🥉'][user.rank - 1] : user.rank}
                </div>

                <Avatar initials={user.avatar} gradient={user.color} size="sm" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold text-sm ${user.isMe ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {user.name} {user.isMe && '(You)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Flame size={11} className="text-orange-500" />
                    <span className="text-xs text-slate-400">{user.streak} day streak</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 text-sm">{user.points.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {[
            { title: '7-Day Study Streak', desc: 'Study every day for 7 days', progress: 5, total: 7, reward: '200 XP', icon: '🔥', active: true },
            { title: 'Mock Test Master', desc: 'Complete 3 practice tests this week', progress: 1, total: 3, reward: '300 XP', icon: '📝', active: true },
            { title: 'Weak Topic Slayer', desc: 'Improve a weak topic by 15%', progress: 8, total: 15, reward: '500 XP', icon: '⚔️', active: false },
            { title: 'Study Room Regular', desc: 'Join 5 study rooms', progress: 2, total: 5, reward: '150 XP', icon: '🏠', active: true },
          ].map((challenge) => (
            <div key={challenge.title} className={`card p-5 ${challenge.active ? '' : 'opacity-60'}`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">{challenge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-800">{challenge.title}</h4>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">{challenge.reward}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{challenge.desc}</p>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-1">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{challenge.progress}/{challenge.total} completed</span>
                    {!challenge.active && <span className="text-xs text-slate-400">Locked</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
