using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PROJECT.Interface;
using PROJECT.Models;

namespace PROJECT.Repository
{
    public class SessionService : ISessionService
    {
        private readonly ApplicationDbContext context;

        public SessionService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Create(Sessions session)
        {
            context.Session.Add(session);
        }

        public void Delete(int id)
        {
            var session = context.Session.SingleOrDefault( c => c.Id == id);

            if(session != null)
            {
                context.Session.Remove(session);
            }
        }

        public IEnumerable<Sessions> GetAll()
        {
            return context.Session.OrderByDescending(x => x.Id).ToList();
        }

        public Sessions GetById(int id)
        {
            return context.Session.SingleOrDefault(c => c.Id == id);
        }

        public void Update(Sessions session)
        {
            var sessions = context.Session.Find(session.Id);
            
            if(session == null)
            throw new ApplicationException("Session not found");

            sessions.Name = session.Name;

            context.Session.Update(sessions);
        }
    }
}